module Manager.Client.Pages.EditRecepie

open Elmish
open Manager.Shared.Recepies
open Manager.Client.Router

type Model = { Title: string }

type Message =
    | SetTitle of string
    | CreateRecepie
    | RecepieCreated of unit

let init =
    let model = { Title = "" }

    model, Cmd.none

let createRecepieCommand api newRecepie =
    Cmd.OfAsync.perform api.createRecepie newRecepie RecepieCreated

let update recepieApi (message: Message) (prevState: Model) =
    match message with
    | SetTitle value ->
        let nextState = { prevState with Title = value }
        nextState, Cmd.none

    | CreateRecepie ->
        let newRecepie: CreateRecepieCommand = { Title = prevState.Title }
        prevState, createRecepieCommand recepieApi newRecepie

    | RecepieCreated _ -> prevState, Cmd.navigatePage Page.Recepies

open Feliz
open Feliz.UseElmish
open Feliz.DaisyUI

[<ReactComponent>]
let View (props: {| api: IRecepieApi |}) =
    let model, dispatch = React.useElmish (init, update props.api, [||])

    Html.div [
        prop.children [
            Daisy.formControl [
                Daisy.label [ Daisy.labelText "Title" ]
                Daisy.input [
                    input.bordered
                    prop.values model.Title
                    prop.onChange (SetTitle >> dispatch)
                ]
            ]
            Daisy.button.button [ prop.onClick (fun (_) -> dispatch CreateRecepie); prop.text "New Recepie" ]
        ]
    ]
