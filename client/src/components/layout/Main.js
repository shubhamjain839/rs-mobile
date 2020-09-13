import React, { Fragment } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { makeStyles } from '@material-ui/core/styles'
const useStyle = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
          paddingTop: 64
        }
      }
}))
const Main = () => {
    const classes = useStyle()
    return (
        <Fragment>
            <Navbar/>
            <Sidebar/>
        </Fragment>
    )
}
export default Main