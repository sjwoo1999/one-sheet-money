export function openDialog(id: string, opener?: HTMLElement) {
  const dlg = document.getElementById(id) as HTMLDialogElement | null;
  if (!dlg) return;
  const openerId = opener ? (opener.id || (opener.id = `opener-${Date.now()}`)) : "";
  if (openerId) dlg.dataset.opener = openerId;
  function onClose() {
    if (!dlg) return;
    dlg.removeEventListener("close", onClose);
    dlg.removeEventListener("keydown", onKeyDown);
    const openerEl = dlg.dataset.opener ? document.getElementById(dlg.dataset.opener) : null;
    if (openerEl) (openerEl as HTMLElement).focus();
  }
  function onKeyDown(e: KeyboardEvent) {
    if (!dlg) return;
    if (e.key !== "Tab") return;
    const focusable = dlg.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusable).filter(el => !el.hasAttribute("disabled"));
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus(); e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus(); e.preventDefault();
    }
  }
  if (!dlg) return;
  dlg.addEventListener("close", onClose);
  dlg.addEventListener("keydown", onKeyDown);
  dlg.showModal();
  // focus first input
  const firstInput = dlg.querySelector<HTMLElement>('input, button, textarea, select, [tabindex]');
  firstInput?.focus();
}
