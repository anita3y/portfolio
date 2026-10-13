import { useRef, useState } from "react";
import {
  DRIVE_NAME,
  WRITINGS_FOLDERS,
  getFileBlocks,
  getWritingsFile,
  getWritingsFolder
} from "../data/writings.js";

const DEFAULT_FOLDER_ID = "writings";
const FOLDER_WIDTH_DEFAULT = 184;
const FILES_WIDTH_DEFAULT = 260;
const FOLDER_WIDTH_MIN = 144;
const FOLDER_WIDTH_MAX = 320;
const FILES_WIDTH_MIN = 192;
const FILES_WIDTH_MAX = 448;
const DRAG_SLOP = 4;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ColumnResize({ label, value, min, max, active, onPointerDown, onKeyDown }) {
  return (
    <button
      type="button"
      className={`finder__resize${active ? " is-active" : ""}`}
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      data-cursor-hover=""
      draggable={false}
      onPointerDown={onPointerDown}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={onKeyDown}
    />
  );
}

export default function WritingsFinder() {
  const [folderId, setFolderId] = useState(DEFAULT_FOLDER_ID);
  const [fileId, setFileId] = useState(null);
  const [folderWidth, setFolderWidth] = useState(FOLDER_WIDTH_DEFAULT);
  const [filesWidth, setFilesWidth] = useState(FILES_WIDTH_DEFAULT);
  const [resizing, setResizing] = useState(null);
  const [offsets, setOffsets] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const previewRef = useRef(null);
  const finderRef = useRef(null);
  const dragRef = useRef(null);
  const itemDragRef = useRef(null);
  const clickGuardRef = useRef(null);
  const folderWidthRef = useRef(FOLDER_WIDTH_DEFAULT);
  const filesWidthRef = useRef(FILES_WIDTH_DEFAULT);

  const folder = getWritingsFolder(folderId);
  const file = getWritingsFile(folderId, fileId);
  const blocks = getFileBlocks(file);
  const links = folder.links ?? [];
  const stills = folder.stills ?? [];
  const embed = folder.embed ?? null;
  const hasScatter = links.length > 0 || stills.length > 0;
  const hasEmbed = Boolean(embed?.src);

  const applyWidths = (folders, files) => {
    folderWidthRef.current = folders;
    filesWidthRef.current = files;
    const node = finderRef.current;
    if (!node) return;
    node.style.setProperty("--finder-folders-w", `${folders}px`);
    node.style.setProperty("--finder-files-w", `${files}px`);
  };

  const selectFolder = (id) => {
    setFolderId(id);
    setFileId(null);
  };

  const startResize = (column, event) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      column,
      pointerId: event.pointerId,
      startX: event.clientX,
      startFolders: folderWidthRef.current,
      startFiles: filesWidthRef.current,
      moved: false
    };
    document.body.classList.add("is-finder-resizing");
    setResizing(column);

    const onMove = (moveEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== moveEvent.pointerId) return;
      const delta = moveEvent.clientX - drag.startX;
      if (Math.abs(delta) < 3 && !drag.moved) return;
      drag.moved = true;
      if (drag.column === "folders") {
        applyWidths(
          clamp(drag.startFolders + delta, FOLDER_WIDTH_MIN, FOLDER_WIDTH_MAX),
          filesWidthRef.current
        );
        return;
      }
      applyWidths(
        folderWidthRef.current,
        clamp(drag.startFiles + delta, FILES_WIDTH_MIN, FILES_WIDTH_MAX)
      );
    };

    const onUp = (upEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== upEvent.pointerId) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      dragRef.current = null;
      document.body.classList.remove("is-finder-resizing");
      setFolderWidth(folderWidthRef.current);
      setFilesWidth(filesWidthRef.current);
      setResizing(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const nudgeWidth = (column, event) => {
    const step = event.shiftKey ? 24 : 8;
    let delta = 0;
    if (event.key === "ArrowLeft") delta = -step;
    if (event.key === "ArrowRight") delta = step;
    if (!delta) return;
    event.preventDefault();
    if (column === "folders") {
      const next = clamp(folderWidthRef.current + delta, FOLDER_WIDTH_MIN, FOLDER_WIDTH_MAX);
      applyWidths(next, filesWidthRef.current);
      setFolderWidth(next);
      return;
    }
    const next = clamp(filesWidthRef.current + delta, FILES_WIDTH_MIN, FILES_WIDTH_MAX);
    applyWidths(folderWidthRef.current, next);
    setFilesWidth(next);
  };

  const startItemDrag = (id, event) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const node = event.currentTarget;
    // The stacked layout lays items out in flow, so there is nothing to drag.
    if (getComputedStyle(node).position !== "absolute") return;

    const scatterBox = node.parentElement.getBoundingClientRect();
    const nodeBox = node.getBoundingClientRect();
    const start = offsets[id] ?? { x: 0, y: 0 };

    itemDragRef.current = {
      id,
      node,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      start,
      // Keep the item inside the column, whichever way it is dragged.
      bounds: {
        minX: start.x - (nodeBox.left - scatterBox.left),
        maxX: start.x + (scatterBox.right - nodeBox.right),
        minY: start.y - (nodeBox.top - scatterBox.top),
        maxY: start.y + (scatterBox.bottom - nodeBox.bottom)
      },
      moved: false
    };

    try {
      node.setPointerCapture(event.pointerId);
    } catch {
      // Window listeners below still track the drag without capture.
    }
    document.body.classList.add("is-finder-dragging");

    const onMove = (moveEvent) => {
      const drag = itemDragRef.current;
      if (!drag || drag.pointerId !== moveEvent.pointerId) return;
      const deltaX = moveEvent.clientX - drag.pointerX;
      const deltaY = moveEvent.clientY - drag.pointerY;
      if (!drag.moved && Math.hypot(deltaX, deltaY) < DRAG_SLOP) return;
      if (!drag.moved) {
        drag.moved = true;
        setDraggingId(drag.id);
      }
      drag.next = {
        x: clamp(drag.start.x + deltaX, drag.bounds.minX, drag.bounds.maxX),
        y: clamp(drag.start.y + deltaY, drag.bounds.minY, drag.bounds.maxY)
      };
      drag.node.style.setProperty("--drag-x", `${drag.next.x}px`);
      drag.node.style.setProperty("--drag-y", `${drag.next.y}px`);
    };

    const onUp = (upEvent) => {
      const drag = itemDragRef.current;
      if (!drag || drag.pointerId !== upEvent.pointerId) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      itemDragRef.current = null;
      document.body.classList.remove("is-finder-dragging");
      setDraggingId(null);
      if (!drag.moved) return;
      // A drag that ends on a link should not open it.
      clickGuardRef.current = drag.id;
      setOffsets((current) => ({ ...current, [drag.id]: drag.next ?? drag.start }));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const itemStyle = (item, extra) => {
    const offset = offsets[item.id];
    return {
      left: item.x,
      top: item.y,
      "--drag-x": `${offset ? offset.x : 0}px`,
      "--drag-y": `${offset ? offset.y : 0}px`,
      ...extra
    };
  };

  return (
    <div
      ref={finderRef}
      className={`finder${file ? " is-open" : ""}${hasScatter ? " is-scatter" : ""}${
        hasEmbed ? " is-embed" : ""
      }${resizing ? " is-resizing" : ""}`}
      style={{
        "--finder-folders-w": `${folderWidth}px`,
        "--finder-files-w": `${filesWidth}px`
      }}
    >
      <div className="finder__gutter finder__gutter--start" aria-hidden="true" />
      <div className="finder__frame">
        <nav className="finder__path" aria-label="Current folder">
          <button
            type="button"
            className="finder__crumb finder__crumb--root"
            onClick={() => selectFolder(DEFAULT_FOLDER_ID)}
          >
            {DRIVE_NAME}
          </button>
          <span className="finder__sep" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className={`finder__crumb${file ? "" : " finder__crumb--current"}`}
            onClick={() => setFileId(null)}
          >
            {folder.label}
          </button>
          {file && (
            <>
              <span className="finder__sep" aria-hidden="true">
                /
              </span>
              <span className="finder__crumb finder__crumb--current">{file.title}</span>
            </>
          )}
        </nav>

        <div className="finder__columns">
          <div className="finder__col finder__col--folders" role="listbox" aria-label="Folders">
            {WRITINGS_FOLDERS.map((item) => {
              const selected = item.id === folderId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  className={`finder__folder${selected ? " is-selected" : ""}`}
                  aria-selected={selected}
                  onClick={() => selectFolder(item.id)}
                >
                  <img
                    className="finder__folder-icon"
                    src={item.icon}
                    alt=""
                    draggable={false}
                  />
                  <span className="finder__folder-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          <ColumnResize
            label="Resize folders column"
            value={folderWidth}
            min={FOLDER_WIDTH_MIN}
            max={FOLDER_WIDTH_MAX}
            active={resizing === "folders"}
            onPointerDown={(event) => startResize("folders", event)}
            onKeyDown={(event) => nudgeWidth("folders", event)}
          />

          {hasScatter ? (
            <div className="finder__scatter" aria-label={`${folder.label} contents`}>
              {links.map((link) => (
                <a
                  key={link.id}
                  className={`finder__read${draggingId === link.id ? " is-dragging" : ""}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={itemStyle(link, { width: link.width })}
                  data-cursor-hover=""
                  draggable={false}
                  onPointerDown={(event) => startItemDrag(link.id, event)}
                  onDragStart={(event) => event.preventDefault()}
                  onClick={(event) => {
                    if (clickGuardRef.current !== link.id) return;
                    clickGuardRef.current = null;
                    event.preventDefault();
                  }}
                >
                  <img
                    className="finder__read-icon"
                    src={link.icon}
                    alt=""
                    draggable={false}
                    style={link.iconWidth ? { width: link.iconWidth } : undefined}
                  />
                  <span className="finder__read-body">
                    <span className="finder__read-title">{link.title}</span>
                    <span className="finder__read-author">{link.author}</span>
                  </span>
                </a>
              ))}
              {stills.map((still) => (
                <figure
                  key={still.id}
                  className={`finder__still${draggingId === still.id ? " is-dragging" : ""}`}
                  style={itemStyle(still, { width: still.displayWidth })}
                  data-cursor-hover=""
                  onPointerDown={(event) => startItemDrag(still.id, event)}
                  onDragStart={(event) => event.preventDefault()}
                >
                  <img
                    src={still.src}
                    alt={still.alt}
                    width={still.width}
                    height={still.height}
                    draggable={false}
                  />
                  <figcaption className="finder__still-name">{still.label}</figcaption>
                </figure>
              ))}
            </div>
          ) : hasEmbed ? (
            <div className="finder__embed" aria-label={embed.title ?? folder.label}>
              <div className="finder__embed-bar">
                <a
                  className="finder__embed-open"
                  href={embed.href ?? embed.src}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-hover=""
                >
                  open on are.na ↗
                </a>
              </div>
              <iframe
                className="finder__embed-frame"
                src={embed.src}
                title={embed.title ?? folder.label}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div
              className="finder__col finder__col--files"
              role="listbox"
              aria-label={`${folder.label} files`}
            >
              {folder.files.length === 0 ? (
                <p className="finder__empty">No Items</p>
              ) : (
                folder.files.map((item) => {
                  const selected = item.id === fileId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      className={`finder__file${selected ? " is-selected" : ""}`}
                      aria-selected={selected}
                      onClick={() => setFileId(item.id)}
                    >
                      {item.title}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {file && (
            <>
              <ColumnResize
                label="Resize files column"
                value={filesWidth}
                min={FILES_WIDTH_MIN}
                max={FILES_WIDTH_MAX}
                active={resizing === "files"}
                onPointerDown={(event) => startResize("files", event)}
                onKeyDown={(event) => nudgeWidth("files", event)}
              />
              <article
                ref={previewRef}
                className="finder__col finder__col--preview"
                aria-label={file.title}
              >
                <h2 className="finder__doc-title">{file.title}</h2>
                {blocks.length > 0 ? (
                  blocks.map((block) =>
                    block.type === "ul" ? (
                      <ul key={`${file.id}-${block.key}`} className="finder__doc-list">
                        {block.items.map((item, itemIndex) => (
                          <li key={`${file.id}-${block.key}-${itemIndex}`}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        key={`${file.id}-${block.key}`}
                        className={block.type === "point" ? "finder__doc-point" : "finder__doc-p"}
                      >
                        {block.text}
                      </p>
                    )
                  )
                ) : (
                  <p className="finder__doc-placeholder">Draft — copy coming soon.</p>
                )}
              </article>
            </>
          )}
        </div>
      </div>
      <div className="finder__gutter finder__gutter--end" aria-hidden="true" />
    </div>
  );
}
