import React, { useContext } from "react"
import { Card} from "@bootstrap-styled/v4"
import { AuthContext } from "../auth/AuthProvider.js"
import { MiniPalette } from "./MiniPalette.js"

export const Profile = ({...props}) => {
	const { profile } = useContext(AuthContext)	
	return profile.isLoading || <>
		{profile.data.palettes.map((p) => (<MiniPalette palette={p} />))}
	</>
}
