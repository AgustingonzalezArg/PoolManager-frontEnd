import { Key } from "react"
import { DataType } from "../pages/Clients"

export const fetchClients = async (idUser: number) => {
    return await fetch(`http://localhost:3000/clients/${idUser}`)
    .then(res => {
        if(!res.ok) throw new Error("Error fetching")
        return res.json()
    })
  }
  
export const fetchAddNewClient = async (idUser: number, values: DataType): Promise<DataType> => {
    return await fetch(`http://localhost:3000/clients/${idUser}`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(values)
    })
    .then(res => {
      if(!res.ok) throw new Error("Client add failed")
      return res.json()
    })
  }
  
export const fetchEditClient = async (idUser: number, values: DataType): Promise<DataType> => {
    return await fetch(`http://localhost:3000/clients/${idUser}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(values)
    })
    .then(res => {
      if(!res.ok) throw new Error("Client edit failed")
      return res.json()
    })
  }
  
// export const fetchUpdateCleanToday = async (idUser: number, arrayIds: Key[]): Promise<void> => {
//     return await fetch(`http://localhost:3000/clients/cleantoday/${idUser}`, {
//       method: "PATCH",
//       headers: {
//         'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(arrayIds)
//     })
//     .then(res => {
//       if(!res.ok) throw new Error("Can't add clients to CleanToday")
//       return res.json()
//     })
//   }
  
// export const fetchUpdateTomorrowToday = async (idUser: number, arrayIds: Key[]): Promise<void> => {
//     return await fetch(`http://localhost:3000/clients/cleantomorrow/${idUser}`, {
//       method: "PATCH",
//       headers: {
//         'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(arrayIds)
//     })
//     .then(res => {
//       if(!res.ok) throw new Error("Can't add clients to CleanTomorrow")
//       return res.json()
//     })
//   }