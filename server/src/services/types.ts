export interface Login {
  username: string,
  password: string
}

export interface Register {
  name: string,
  email: string,
  username: string,
  password: string
}

export interface GetDocumentsByUserId {
  userId: string
}
