type GoalProps = {
 title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string | Date;
    status: string;
    id: number;
}
const Goal =({title,description,priority,dueDate,status,id}: GoalProps) => {
    return(<>
        <article className="container" key={id}>
            <h1 className="title">
                {title}
            </h1>
            <p className="description">{description}</p> 
            <p>{dueDate}</p>
            <p>{priority}</p>
            <p>{status}</p>
            </article>
    </>)
}

export default Goal;