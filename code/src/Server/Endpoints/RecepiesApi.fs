module Api

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Microsoft.AspNetCore.Http

open Manager.Shared
open Manager.Shared.Recepies

module Mappers =
    let toRecepieOverview (recepie: Manager.Recepies.DomainTypes.Recepie) : RecepieInfoDto =
        let (Manager.Recepies.DomainTypes.RecepieId id) = recepie.Id

        {
            Id = id
            Title = recepie.Name
        }

open Manager.Server.Database
open Recepie.Repository

let create api =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.fromContext api
    |> Remoting.buildHttpHandler

let getRecepieById dbContext recepieId =
    async {
        let! recepie = getById dbContext recepieId
        return recepie
    }

let getRecepies dbContext =
    async {
        let! recepies = readAll dbContext

        return
            recepies
            |> Seq.map (fun recepie ->
                {
                    Id = recepie.recepie_id
                    Title = recepie.name
                }
            )
    }

let createRecepie (newRecepie: CreateRecepieCommand) dbContext =
    async { do! createRecepie newRecepie dbContext |> Async.Ignore }

let recepiesApi (context: HttpContext) =
    {
        getRecepieById = fun (recepieId) -> getRecepieById (openContext ()) recepieId
        getRecepieInfos = fun () -> getRecepies (openContext ())
        createRecepie = fun (newRecepie) -> createRecepie newRecepie (openContext ())
    }
