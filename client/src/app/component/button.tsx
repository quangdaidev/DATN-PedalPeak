export default function Button(props: { content: String}) {
    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
           {props.content}
        </button>
    )
}