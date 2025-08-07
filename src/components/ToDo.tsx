import { type ToDoProps } from "../resources/types/propsTypes";
const Goal = ({ title, description, priority, dueDate, status, id,  onDelete }: ToDoProps) => {
    return (<>
        <article className="container"  data-id={id}>
            <h1 className="title">
                {title}
            </h1>
            <p className="description">{description}</p>
            <p>{(dueDate instanceof Date) ? dueDate.toLocaleDateString() : dueDate}</p>

            <p>{priority}</p>
            <p>{status}</p>
            <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
        </article>
    </>)
}

export default Goal;  