import { DefinitionTable } from "../DefinitionTable/DefinitionTable";

interface GenerateTableProps {
    lugar: string;
    data: any;
}

export const GenerateTable = ({lugar,data}:GenerateTableProps) => {
    console.log(lugar)

    let content;

    switch(lugar){
        case 'all-qrs': {
            content = <DefinitionTable data={data} lugar={"all-qrs"} />;
            break;
        }
        default:
            return;
    }

    return content;
}