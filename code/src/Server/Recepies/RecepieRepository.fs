module Recepie.Repository

open Common.Database
open Manager.Recepies

open Shared

let toDomainObject (data: database.dataContext.``public.recepieEntity``) : Recepie =
    { Id = RecepieId data.Id
      Title = data.Title
      Description = "" }

let readAll (dbContext: database.dataContext) =
    query {
        for recepie in dbContext.Public.Recepie do
            select recepie
    }
    |> Seq.map toDomainObject
    |> Seq.toList

let createRecepie newRecepie (dbContext: database.dataContext) =
    let row = dbContext.Public.Recepie.Create()

    row.Title <- newRecepie.Title

    dbContext.SubmitUpdates()
