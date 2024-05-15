interface TextFilterComponentProps {
    id: string;
    filterText: string;
    onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    placeholder: string;
}

export const TextFilterComponent = ({ id, filterText, onFilter, onClear, placeholder }:TextFilterComponentProps) => (
    <>
    <div className="input-group mb-3">
        <input
            className="form-control"
            id={id}
            type="text"
            placeholder={placeholder}
            value={filterText}
            onChange={onFilter}
        />
        <div className="input-group-append">
            <button className="btn btn-danger" onClick={onClear}>X</button>
        </div>
    </div>
    </>
  );