import { useRef, useState } from "react";

export function useDragSort(items, onReorder) {
  const dragIndex  = useRef(null);
  const touchY     = useRef(null);
  const itemRefs   = useRef([]);

  const [draggingId, setDraggingId] = useState(null);
  const [overIndex,  setOverIndex]  = useState(null);

  // ── Helpers ─────────────────────────────────────────────────────────────
  function reorder(from, to) {
    if (from === null || from === to || to === null) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
  }

  function cleanup() {
    dragIndex.current = null;
    touchY.current    = null;
    setDraggingId(null);
    setOverIndex(null);
  }

  function getIndexFromY(clientY) {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const { top, bottom } = el.getBoundingClientRect();
      if (clientY >= top && clientY <= bottom) return i;
    }
    return null;
  }

  // ── Mouse / Desktop ──────────────────────────────────────────────────────
  function onDragStart(index, id) {
    dragIndex.current = index;
    setDraggingId(id);
  }

  function onDragOver(e, index) {
    e.preventDefault();
    setOverIndex(index);
  }

  function onDrop(index) {
    reorder(dragIndex.current, index);
    cleanup();
  }

  // ── Touch / Mobile ───────────────────────────────────────────────────────
  function onTouchStart(e, index, id) {
    dragIndex.current = index;
    touchY.current    = e.touches[0].clientY;
    setDraggingId(id);
  }

  function onTouchMove(e) {
    e.preventDefault(); // impede scroll da página durante drag
    const clientY = e.touches[0].clientY;
    const idx = getIndexFromY(clientY);
    if (idx !== null) setOverIndex(idx);
  }

  function onTouchEnd() {
    reorder(dragIndex.current, overIndex);
    cleanup();
  }

  // ── Props factory ────────────────────────────────────────────────────────
  function getDragProps(index, id) {
    return {
      // Desktop
      draggable:   true,
      onDragStart: () => onDragStart(index, id),
      onDragOver:  (e) => onDragOver(e, index),
      onDrop:      () => onDrop(index),
      onDragEnd:   cleanup,
      // Mobile
      onTouchStart: (e) => onTouchStart(e, index, id),
      onTouchMove:  onTouchMove,
      onTouchEnd:   onTouchEnd,
      // Ref para cálculo de posição por toque
      ref: (el) => { itemRefs.current[index] = el; },
    };
  }

  return { draggingId, overIndex, getDragProps };
}
