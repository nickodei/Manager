module Manager.Client.Router

open System
open Browser.Types
open Feliz.Router
open Fable.Core.JsInterop

type Page =
    | Recepies
    | RecepiesCreate
    | RecepiesEdit of id: Guid
    | NotFound

[<RequireQualifiedAccess>]
module Page =
    let defaultPage = Page.Recepies

    let areRelated (currentPage: Page) (next: Page) =
        match currentPage, next with
        | RecepiesCreate, Recepies -> true
        | c, n -> c = n

    let parseFromUrlSegments =
        function
        | [ "recepies" ] -> Page.Recepies
        | [ "recepies"; "create" ] -> Page.RecepiesCreate
        | [ "recepies"; "edit"; Route.Query [ "guid", guid ] ] -> Page.RecepiesEdit (Guid.Parse guid)
        | [] -> defaultPage
        | _ -> Page.NotFound

    let noQueryString segments : string list * (string * string) list = segments, []

    let toUrlSegments =
        function
        | Page.RecepiesEdit guid -> [ "recepies"; "edit" ], [ ("guid", guid.ToString()) ]
        | Page.RecepiesCreate -> [ "recepies"; "create" ] |> noQueryString
        | Page.Recepies -> [ "recepies" ] |> noQueryString
        | Page.NotFound -> [ "empty" ] |> noQueryString

[<RequireQualifiedAccess>]
module Router =
    let goToUrl (e: MouseEvent) =
        e.preventDefault ()
        let href: string = !!e.currentTarget?attributes?href?value
        Router.navigatePath href

    let navigatePage (p: Page) =
        p |> Page.toUrlSegments |> Router.navigatePath

[<RequireQualifiedAccess>]
module Cmd =
    let navigatePage (p: Page) =
        p |> Page.toUrlSegments |> Cmd.navigatePath
