import React, {useState} from 'react';
import {
    Avatar,
    Button,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Theme
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {PlatformAuth} from '../model/PlatformAuth';
import {BiCircle} from "react-icons/bi";
import {BASE_URL} from "../constants/constant";



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '40ch',
            display: 'flex',
            marginLeft: '70ch',
            justifyContent: 'center'
        },
    },
}));

const useStylesFormControl = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: 500,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const AuthorizationForm = () => {
    const classes = useStyles();
    const classesFormControl = useStylesFormControl();
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [authorizationCode, setAuthorizationCode] = useState("");
    const [dateRange, setDateRange] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDateRange(event.target.value as string);
    };

    const handleSend = () => {
        if (storeName !== "" && authorizationCode !== "" && dateRange!=="") {
            let data: PlatformAuth = {
                organizationId: 1,
                platformStoreId: 1,
                applicationId: storeName,
                applicationSecret: "",
                grantType: "password",
                authRequestUrl: "string",
                authToken: authorizationCode,
                authScope: "profile",
            }
            console.log({storeName, authorizationCode})
            fetch(`${BASE_URL}/v1/platform-auth`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(() => {
                fetch(`${BASE_URL}/v1/adapter/shopify/pull/sales-data?dateRange=${Number(dateRange)}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Business-ID': '1',
                        'User-ID': '1'
                    },
                }).then(() => navigate("/dashboard"))
            })
        } else{
            setError(true)
        }
    }

    return (
        <div className={"formContainer"}>
            <div className={"textHead"}>Shopify-Demo</div>
            <div className={"headImage"}>
                <Avatar alt="Remy Sharp" src="../assets/unicorn.png"/>
                <span><BiCircle color='blue' size='10'/> <BiCircle size='10'/> <BiCircle size='10'/></span>
                <Avatar alt="Remy Sharp" src="../assets/Shopify.jpg"/>
            </div>
            <div className={"textSubHed"}>
                Unicorn BI is requesting access to your shopify store
            </div>
            <div className={"textDes"}>By giving access permission to Unicorn BI, you authorize Unicorn BI to get below
                information from your shopify store in accordence with their Privacy Policy. At any time you can revoke
                access permission for shopify or any    other application by visiting your app settings page.
            </div>
            <form justify-content="center" className={classes.root} noValidate autoComplete="off">
                <TextField id="storeName"
                           label="Shopify Store Name"
                           value={storeName}
                           onChange={(e) => setStoreName(e.target.value)}/>

                <TextField id="authorizationCode"
                           label="API Access Token"
                           value={authorizationCode}
                           onChange={(e) => setAuthorizationCode(e.target.value)}/>

                <Grid container justify="center">
                    <FormControl className={classesFormControl.formControl}>
                        <InputLabel id="demo-simple-select-label">Data need for</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dateRange}
                            onChange={handleChange}
                        >
                            <MenuItem value={7}>7 Days</MenuItem>
                            <MenuItem value={15}>15 Days</MenuItem>
                            <MenuItem value={30}>1 Month</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid container justify="center">
                    <Button variant="contained"
                            color="primary"
                            onClick={handleSend}
                            className={"sendButton"}>
                        Connect Application
                    </Button>
                </Grid>
                {error && <Grid container justify="center"> <div style={{color:'red'}}>All fields are mandatory.</div></Grid>}
            </form>

        </div>
    );
};

export default AuthorizationForm;
