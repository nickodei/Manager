namespace Shared

type RecepieOverview =
    {
        Id: string
        Title: string
    }

type NewRecepie = { Title: string }

type IRecepieApi =
    {
        getRecepies: unit -> Async<RecepieOverview seq>
        createRecepie: NewRecepie -> Async<unit>
    }

module Route =
    let builder typeName methodName = $"/api/%s{typeName}/%s{methodName}"
