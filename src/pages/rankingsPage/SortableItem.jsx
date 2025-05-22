import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { shortenName } from "../../utilities/utilities.js"

// Sortable Item Component
function SortableItem({ id, index, name }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style = transform
        ? {
            transform: CSS.Transform.toString(transform),
            transition,
        }
        : {}

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`ranking-item ${isDragging ? "dragging" : ""}`}
            {...attributes}
            {...listeners}
        >
            <span className="ranking-number">{index + 1}</span>

            <div className="ranking-photo">
                <img src={`/images/Players/${name}.jpg`} alt={""} />
            </div>
            <span className="player-name">{shortenName(name)}</span>
            <span className="drag-indicator">⋮⋮</span>

        </div>
    )
}

export default SortableItem