import { Record } from "../fable_modules/fable-library.4.9.0/Types.js";
import { lambda_type, class_type, unit_type, record_type, string_type } from "../fable_modules/fable-library.4.9.0/Reflection.js";

export class RecepieOverview extends Record {
    constructor(Id, Title) {
        super();
        this.Id = Id;
        this.Title = Title;
    }
}

export function RecepieOverview_$reflection() {
    return record_type("Shared.RecepieOverview", [], RecepieOverview, () => [["Id", string_type], ["Title", string_type]]);
}

export class NewRecepie extends Record {
    constructor(Title) {
        super();
        this.Title = Title;
    }
}

export function NewRecepie_$reflection() {
    return record_type("Shared.NewRecepie", [], NewRecepie, () => [["Title", string_type]]);
}

export class IRecepieApi extends Record {
    constructor(getRecepies, createRecepie) {
        super();
        this.getRecepies = getRecepies;
        this.createRecepie = createRecepie;
    }
}

export function IRecepieApi_$reflection() {
    return record_type("Shared.IRecepieApi", [], IRecepieApi, () => [["getRecepies", lambda_type(unit_type, class_type("Microsoft.FSharp.Control.FSharpAsync`1", [class_type("System.Collections.Generic.IEnumerable`1", [RecepieOverview_$reflection()])]))], ["createRecepie", lambda_type(NewRecepie_$reflection(), class_type("Microsoft.FSharp.Control.FSharpAsync`1", [unit_type]))]]);
}

export function Route_builder(typeName, methodName) {
    return `/api/${typeName}/${methodName}`;
}

//# sourceMappingURL=Shared.js.map
