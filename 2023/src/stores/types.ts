type TripStopActivationResult = { Activated: boolean, Reason: { Type: string, Info: any } }
type TripStopActivation = (ctx: any) => TripStopActivationResult
type TripContext = {
  Location: [number, number],
  Time: Date,
  Codes: string[]
}

type TripStop = {
  activation: TripStopActivation
}

type Trip = {
  teamName: string
  tour: TripStop[]
}

type Destination = {
  info: string
  coord : [number, number]
}

export type { TripStopActivationResult, TripStopActivation, TripContext, TripStop, Trip, Destination }
