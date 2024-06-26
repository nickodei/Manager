module Index

open Elmish
open Fable.Remoting.Client
open Manager.Shared
open Manager.Shared.Recepies
open Feliz.Router
open Page

open Manager.Client.Router
open Manager.Client.Pages

type Model = { CurrentPage: Page }

type Message = UrlChanged of Page

let recepieApi =
    Remoting.createApi ()
    |> Remoting.withRouteBuilder Route.builder
    |> Remoting.buildProxy<IRecepieApi>

let init () =
    let nextPage = Router.currentPath () |> Page.parseFromUrlSegments
    { CurrentPage = nextPage }, Cmd.navigatePage nextPage

let update msg state =
    match msg with
    | UrlChanged page -> { state with CurrentPage = page }, Cmd.none

open Feliz

let view state dispatch =
    Html.section [
        prop.className "h-screen w-screen"
        prop.children [
            React.router [
                router.pathMode
                router.onUrlChanged (Page.parseFromUrlSegments >> UrlChanged >> dispatch)
                router.children [
                    match state.CurrentPage with
                    | Page.Recepies -> Recepies.View {| api = recepieApi |}
                    | Page.RecepiesCreate -> CreateRecepie.View {| api = recepieApi |}
                    | Page.RecepiesEdit guid -> Html.h1 ("Recepie edit: " + guid.ToString())
                    | Page.NotFound -> Html.h1 "Page not found!"
                ]
            ]
        ]
    ]
