import '.././App.css';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Form } from "react-bootstrap";
import { Button } from '@mui/material';

import Map from './Map';
import { API_URL } from '../utils/constants'
import { color } from '@mui/system';

function MapPage() {
    const [selectedTerminalId, setReqTerminalId] = useState("");
    const [terminalId, setTerminalId] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [positions, setPositions] = useState([]);
    const [loadingPage, isLoading] = useState(true);
    const [bgColour, changeBgColour] = useState("green");

    function handleTerminalId(index, props, value) {
        console.log(index);
        console.log(props);
        console.log(value);
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
        const response = await Promise.resolve(fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': 'token',
                'Access-Control-Allow-Origin': '*'
            })
        }).then((response) => response.json())
            .catch(err => {
                console.error(err);
            }));
        return response;
    };

    const getMapPositions = async () => {
        console.log(date);
        console.log(selectedTerminalId);
        const resp = await getPositions(`${API_URL}/positions/getLocations?terminalId=${selectedTerminalId}&startDate=${date.startDate}&finalDate=${date.endDate}`);
        console.log(resp);
        const posData = new Set(resp.map((obj) => ({
            lat: obj.latitude,
            lng: obj.longitude,
        }))
            .map(JSON.stringify)
        );
        setPositions([...posData].map(JSON.parse));
    }

    useEffect(async () => {
        const resp = await getPositions(`${API_URL}/positions/`);
        const data = resp.map((obj) => obj.terminalId);
        setTerminalId([...new Set(data)]);
        isLoading(false);
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
        </Box>

    );
}

export default MapPage;