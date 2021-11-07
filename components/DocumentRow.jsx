import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/dist/client/router"

function DocumentRow({ id, fileName, date, onDelete }) {
    const router = useRouter()
    return (
        <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 text-base">
            <Icon name="article" size="3xl" color="blue" />
            <p onClick={() => router.push(`/doc/${id}`)} className="flex-grow pl-5 pr-10 w-10 truncate leading-loose cursor-pointer select-none">{fileName}</p>
            <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
            <Button color="gray" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="border-none cursor-pointer" onClick={(e) => { e.preventDefault(); onDelete(id) }}>
                <Icon name="delete" size="xl" color="red" />
            </Button>
        </div>
    )
}

export default DocumentRow
