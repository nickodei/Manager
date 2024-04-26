module Api

open Fable.Remoting.Server
open Fable.Remoting.Giraffe
open Microsoft.AspNetCore.Http

open Shared

module Mappers =
    let toRecepieOverview (recepie: Manager.Recepies.DomainTypes.Recepie) : RecepieOverview =
        let (Manager.Recepies.DomainTypes.RecepieId id) = recepie.Id

        {
            Id = id.ToString()
            Title = recepie.Title
        }

open Common.Database
open Recepie.Repository

let create api =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.fromContext api
    |> Remoting.buildHttpHandler

let getRecepies dbContext =
    task { return readAll dbContext |> Seq.map Mappers.toRecepieOverview }

let createRecepie newRecepie dbContext =
    task { return createRecepie newRecepie dbContext }

let recepiesApi (context: HttpContext) =
    let dbContext = Database.createContext Database.connectionString

    {
        getRecepies = fun () -> getRecepies dbContext |> Async.AwaitTask
        createRecepie = fun (newRecepie) -> createRecepie newRecepie dbContext |> Async.AwaitTask
    }
