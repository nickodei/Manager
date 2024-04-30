module Page.Recepies

open Elmish
open Manager.Shared.Recepies

open Manager.Client.Router
open Components.Recepie

type Model =
    {
        Recepies: RecepieInfoDto seq
        NewRecepie: CreateRecepieCommand option
    }

type Message =
    | LoadRecepies
    | RecepiesLoaded of RecepieInfoDto seq
    | SetTitle of string
    | CreateRecepie of CreateRecepieCommand option
    | RecepieCreated of unit

let createRecepieCommand api newRecepie =
    Cmd.OfAsync.perform api.createRecepie newRecepie RecepieCreated

let loadRecepies api =
    Cmd.OfAsync.perform api.getRecepieInfos () RecepiesLoaded

let init =
    let model =
        {
            Recepies = Seq.empty
            NewRecepie = None
        }

    model, Cmd.ofMsg LoadRecepies

let update recepieApi message prevState =
    match message with
    | LoadRecepies -> prevState, loadRecepies recepieApi

    | RecepiesLoaded recepies ->
        let nextState = { prevState with Recepies = recepies }
        nextState, Cmd.none

    | SetTitle title ->
        let nextState = { prevState with NewRecepie = Some({ Title = title }) }

        nextState, Cmd.none

    | CreateRecepie newRecepie ->
        match newRecepie with
        | Some(value) ->
            let nextState = { prevState with NewRecepie = None }
            nextState, createRecepieCommand recepieApi value
        | None -> prevState, Cmd.none

    | RecepieCreated _ -> prevState, loadRecepies recepieApi

open Feliz
open Feliz.UseElmish
open Feliz.DaisyUI

[<ReactComponent>]
let View (props: {| api: IRecepieApi |}) =
    let model, _ = React.useElmish (init, update props.api, [||])

    Html.div [
        prop.children [
            Html.h1 "Recepies"
            Html.div [
                prop.classes [ "grid"; "grid-cols-4"; "gap-4" ]
                prop.children [
                    for recepie in model.Recepies do
                        RecepieCard.View {| recepie = recepie |}
                    Daisy.button.button [
                        prop.onClick (fun (_) -> Router.navigatePage Page.RecepiesCreate)
                        prop.text "New Recepie"
                    ]
                ]
            ]
        ]
    ]
