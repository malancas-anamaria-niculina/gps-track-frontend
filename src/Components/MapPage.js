import '.././App.css';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Form } from "react-bootstrap";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Map from './Map';
import { API_URL, axiosConfig } from '../utils/constants'
import { color } from '@mui/system';

function MapPage() {
    const [selectedTerminalId, setReqTerminalId] = useState("");
    const [terminalId, setTerminalId] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [positions, setPositions] = useState([]);
    const [loadingPage, isLoading] = useState(true);
    const [bgColour, changeBgColour] = useState("green");

    const config = axiosConfig(localStorage.getItem("token"));
    const navigate = useNavigate();

    function handleTerminalId(index, props, value) {

        setReqTerminalId(value);
    }

    function renderRow(props) {
        const { data, index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding onClick={handleTerminalId.bind(this, index, props, data[index])}>
                <ListItemButton>
                    <ListItemText primary={`${data[index]}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    const getPositions = async (url) => {
        axios
            .get(url, config)
            .then((response) => response.data)
            .then((data) => data.map((obj) => obj.terminalId))
            .then((terminalsId) => {
                setTerminalId([...new Set(terminalsId)]);
                isLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const getMapPositions = async () => {
        const url = `${API_URL}/positions/getLocations?terminalId=${selectedTerminalId}&startDate=${date.startDate}&finalDate=${date.endDate}`;

        await axios
            .get(url, config)
            .then((response) => response.data)
            .then((data) => {
                const newData = new Set(
                    data
                        .map((entry) => ({
                            lat: entry.latitude,
                            lng: entry.longitude,
                        }))
                        .map(JSON.stringify)
                );
                setPositions([...newData].map(JSON.parse));
                isLoading(false);
            })
            .catch((error) => console.log(error));

    };

    const logout = () => {
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        navigate('/login');
    }

    useEffect(async () => {
        await getPositions(`${API_URL}/positions/getPositions?username=${localStorage.getItem("username")}`);
    }, []);

    return (

        < Box
            sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', display: 'flex' }}
        >

            {!!!loadingPage && (<div className="terminalList">
                <p>Selected terminal id: {selectedTerminalId}</p>
                <FixedSizeList
                    height={600}
                    width={360}
                    itemData={terminalId}
                    itemSize={46}
                    itemCount={terminalId.length}
                    overscanCount={5}
                >

                    {renderRow}
                </FixedSizeList>
            </div>)}
            <div className='compDiv'>
                <Form>
                    <div className='formStyle'>
                        <div>
                            <Form.Group className="mb-3" controlId="startDate">
                                <Form.Label>Start Date </Form.Label>
                                <Form.Control type="text"
                                    placeholder="yyyy-MM-dd"
                                    defaultValue={date.startDate}
                                    onChange={e => setDate({ ...date, startDate: e.target.value })} />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="endDate">
                                <Form.Label>End Date </Form.Label>
                                <Form.Control type="text"
                                    placeholder="yyyy-MM-dd"
                                    defaultValue={date.endDate}
                                    onChange={e => setDate({ ...date, endDate: e.target.value })} />
                            </Form.Group>
                        </div>
                        <div>
                            <Button onClick={getMapPositions}>Get locations</Button>
                        </div>
                    </div>
                </Form>
                <div className="divC">
                    {!!positions.length && <Map positions={positions} />}
                </div>
            </div>
            <div>
                <p>Welcome, {localStorage.getItem("username")}</p>
                <Button onClick={logout}>Log out</Button>
            </div>
        </Box>

    );
}

export default MapPage;