module Recepie.Repository

open System
open SqlHydra.Query
open Manager.Server.DatabaseTypes

open Manager.Shared.Recepies

let mapRecepieIngredientsToDto (ri: recepies.recepie_ingredient) (i: recepies.ingredient) =
    {
        Id = i.ingredient_id
        Name = i.name
        Amount = ri.amount
        Unit = ri.unit
    }

let readAll ctx =
    selectAsync HydraReader.Read ctx {
        for recepie in recepies.recepie do
            select recepie
    }

let getById ctx recepieId =
    async {
        let! results =
            selectAsync HydraReader.Read ctx {
                for r in recepies.recepie do
                    leftJoin ri in recepies.recepie_ingredient on (r.recepie_id = ri.Value.recepie_id)
                    leftJoin i in recepies.ingredient on (ri.Value.ingredient_id = i.Value.ingredient_id)
                    where (r.recepie_id = recepieId)
                    select (r, ri, i)
            }

        return
            results
            |> Seq.groupBy (fun (r, _, _) -> r.recepie_id)
            |> Seq.map (fun (key, values) ->
                {
                    Id = key
                    Name =
                        match (Seq.head values) with
                        | (r, _, _) -> r.name
                    Description = ""
                    Ingredients =
                        Seq.choose
                            (fun value ->
                                match value with
                                | (_, Some ri, Some i) -> Some(mapRecepieIngredientsToDto ri i)
                                | _ -> None
                            )
                            values
                        |> Seq.toList
                }
            )
            |> Seq.tryHead
    }



let createRecepie (newRecepie: CreateRecepieCommand) ctx =
    insertAsync ctx {
        into recepies.recepie

        entity
            {
                recepies.recepie.recepie_id = Guid.NewGuid()
                recepies.recepie.name = newRecepie.Title
            }
    }
