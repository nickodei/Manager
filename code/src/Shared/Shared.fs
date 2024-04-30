namespace Manager.Shared

open System

module Recepies =
    type IngredientDto =
        {
            Id: Guid
            Name: string
            Amount: decimal
            Unit: string
        }

    type RecepieDto =
        {
            Id: Guid
            Name: string
            Description: string
            Ingredients: IngredientDto list
        }

    type CreateRecepieCommand = { Title: string }

    type RecepieInfoDto =
        {
            Id: Guid
            Title: string
        }

    type IRecepieApi =
        {
            getRecepieInfos: unit -> Async<RecepieInfoDto seq>
            getRecepieById: Guid -> Async<RecepieDto option>
            createRecepie: CreateRecepieCommand -> Async<unit>
        }

module Route =
    let builder typeName methodName = $"/api/%s{typeName}/%s{methodName}"
