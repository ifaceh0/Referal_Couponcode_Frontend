import React from 'react'
import { useParams } from 'react-router-dom'
import UserSignUp from './UserSignUp';
import ShopkeeperSignUp from "./ShopkeeperSignUp"

const SignUpToggle = () => {
    const {role} = useParams();   
  return (
    <>
    {role === "user" ? <UserSignUp/> : <ShopkeeperSignUp/>}
    </>
  )
}

export default SignUpToggle