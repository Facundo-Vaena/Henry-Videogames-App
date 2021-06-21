import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import { getVideogames } from '../actions/index';
import { getGenres } from '../actions/index'
import { Link } from 'react-router-dom';
import Videogame from './Videogame';
import './Home.css';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';



export function Home({ videogames, genres, getVideogames, getGenres }) {
    const [page, setPage] = useState(0);
    const [orderFilter, setOrderFilter] = useState({ order: null, filter: null });
    const [open, setOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openCreated, setOpenCreated] = useState(false);
    const [openGenres, setOpenGenres] = useState(false);



    useEffect(() => {
        getVideogames();
        getGenres();

    }, [])

    function preGetVideogames() {
        if (orderFilter.order === 'norm') {
            getVideogames()
            return setOrderFilter({ order: null, filter: null })
        }
        getVideogames(orderFilter.order, orderFilter.filter);
        setOrderFilter({ order: null, filter: null })
    }




    return (<div className='homeContainer'>


        <div>
            <div>
                <button className='homePageBtn' onClick={() => setPage(0)}>1</button>
                <button className='homePageBtn' onClick={() => setPage(16)}>2</button>
                <button className='homePageBtn' onClick={() => setPage(31)}>3</button>
                <button className='homePageBtn' onClick={() => setPage(47)}>4</button>
                <button className='homePageBtn' onClick={() => setPage(63)}>5</button>
                <button className='homePageBtn' onClick={() => setPage(79)}>6</button>
                <button className='homePageBtn' onClick={() => setPage(95)}>7</button>


            </div>
            <NavLink to='/' className='navLink'>
            <h1 className='homeTitle'>Henry Videogames</h1>
            </NavLink>
            
            <div className='homeSearchBar'>
                <SearchBar />
            </div>
        <div className='searchCreationOrder'>


            <div className='btnHomeContainer'>
                <Link to={'/createvideogame'}>
                    <button className='btnHomeCreation'>Videogames Creation</button>
                </Link>
            </div>




            <span className={open ? 'orderFilterContainerClicked':'orderFilterContainer'}>
                {/* <button onClick={() =>{setOpen([!open[0]])}}>order</button>
                {open[0] ? <div> <button onClick={() => setOpen([true, !open[1], false])}>alpha</button> <button onClick={()=>setOpen([true, false, !open[2]])}>rating</button> </div> : null}
                {open[0] && open[1] ? <div> <p>Select a filter</p> <button>genre</button> <button>created</button> </div> : null}
                {open[0] && open[2] ? <div> <p>Select a filter</p> <button>genre</button> <button>created</button> </div> : null} */}

                <div><button classname='btnOrderFilter' onClick={() => setOpen(!open)}>Order & Filter</button></div>
                {orderFilter.order !== null || orderFilter.filter !== null ? <button className='filterOrderEnter' onClick={() => preGetVideogames()}>Reorganize Videogames</button> : null}

                {/* {open ? <span className='btnOrderFilter2'> <div className='btnOrder'><button  onClick={() => setOpenOrder(!openOrder)}>Order</button></div> <div className='btnFilter'><button onClick={() => setOpenFilter(!openFilter)}>Filter</button></div></span> : null} */}
                <div className='orderContainer'>
                    {open ? <span><button className='filterOrderStart' onClick={() => setOpenOrder(!openOrder)}>Order</button></span> : null}
                    <div className='ordersContainer'>
                    {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'aAsc' })}>Ascending Alphabetical Order</button> </span> : null}
                    {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'norm' })}>Normal Order</button></span> : null} 
                    {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'aDesc' })}>Descending Alphabetical Order</button> </span> : null}
                    {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'rating' })}>Best Ranked</button> </span> : null}
                    </div>
                </div>
                <div className='filterContainer'>
                    {open ? <span><button className='filterOrderStart' onClick={() => setOpenFilter(!openFilter)}>Filter</button></span> : null}
                    <div className='filterSubcontainer'>
                        <div className='genreContainer'>
                            {openFilter && open ? <span><button className='filterOrderMiddle' onClick={() => setOpenGenres(!openGenres)}>By Genre</button></span> : null}
                            {openGenres && openFilter && open ?
                                <span>  <select className='filterOrderEnd' name="filterByGenre" onChange={(e) => setOrderFilter({ ...orderFilter, filter: e.target.value })}>
                                    <option key={2} value="" selected >Select a Genre---</option>
                                    {genres.map(e => {
                                        return (<option key={e.id}>{e.name}</option>)
                                    })}
                                </select>
                                </span>
                                : null}
                        </div>
                        <div className='createdContainer'>
                            {openFilter && open ? <span><button className='filterOrderMiddle' onClick={() => setOpenCreated(!openCreated)}>Show or Hide Created Videogames</button></span> : null}
                            {openCreated && openFilter && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...setOrderFilter, filter: 'hideCreated' })}>Hide Created Games</button></span> : null}
                            {openCreated && openFilter && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...setOrderFilter, filter: 'onlyCreated' })}>Show Only Created Games</button></span> : null}
                        </div>
                    </div>
                </div>
                {/* {openCreated ? <span> <button onClick={() => setOrderFilter({ ...setOrderFilter, filter: 'hideCreated' })}>Hide Created Games</button> <button onClick={() => setOrderFilter({ ...setOrderFilter, filter: 'onlyCreated' })}>Show Only Created Games</button> </span> : null} */}
                {/* {openOrder ? <span> <button onClick={() => setOrderFilter({ ...orderFilter, order: 'aAsc' })}>Ascending Alphabetical Order</button>  <button onClick={() => setOrderFilter({ ...orderFilter, order: 'norm' })}>Normal Order</button> <button onClick={() => setOrderFilter({ ...orderFilter, order: 'aDesc' })}>Descending Alphabetical Order</button> </span> : null} */}
                {/* {openFilter ? <div> <button onClick={() => setOpenGenres(!openGenres)}>By Genre</button> <button onClick={() => setOpenCreated(!openCreated)}>Show or Hide Created Videogames</button> </div> : null} */}

            </span>
            </div>


            {/* <div>
                <button onClick={() => getVideogames()}>Normal Order</button>
            </div>

            <div>
                <button onClick={() => getVideogames('desc')}>Descending Alphabetical Order</button>
            </div>

            <div>
                <button onClick={() => getVideogames('asc')}>Ascending Alphabetical Order</button>
            </div>
            <div>
                <button onClick={() => getVideogames('rAsc')}>Best Ranked</button>
            </div>

            <div>

                <select name="filterByGenre" onChange={(e) => getVideogames(null, e.target.value)}>
                    <option key={2} value="" selected >Select a Genre---</option>
                    {genres.map(e => {
                        return (<option key={e.id}>{e.name}</option>)
                    })}
                </select>
            </div>

            <div>
                <button onClick={() => getVideogames(null, null, 'show')}>Show only Created Games</button>
            </div>

            <div>
                <button onClick={() => getVideogames(null, null, 'hide')}>Hide Created Games</button>
            </div> */}




<div className='videogames'>
            {videogames.length ?
                videogames.slice(page, (page + 15)).map(e => {
                    return (
                        <div>
                            <Videogame
                                key={e.id}
                                idVideogame={e.id}
                                img={e.img}
                                name={e.name}
                                genres={e.genres}


                            />
                        </div>
                    )
                }
                ) : <h1></h1>
            }

</div>



        </div>
            <div>
                <button className='homePageBtn' onClick={() => setPage(0)}>1</button>
                <button className='homePageBtn' onClick={() => setPage(16)}>2</button>
                <button className='homePageBtn' onClick={() => setPage(31)}>3</button>
                <button className='homePageBtn' onClick={() => setPage(47)}>4</button>
                <button className='homePageBtn' onClick={() => setPage(63)}>5</button>
                <button className='homePageBtn' onClick={() => setPage(79)}>6</button>
                <button className='homePageBtn' onClick={() => setPage(95)}>7</button>


            </div>
    </div>)
}

function mapStateToProps(state) {
    return {
        videogames: state.videogames,
        genres: state.genres
    }
}




function mapDispatchToProps(dispatch) {
    return {
        // getVideogames: (order, genre, creation) => dispatch(getVideogames(order, genre, creation)),
        getVideogames: (order, filter) => dispatch(getVideogames(order, filter)),
        getGenres: () => dispatch(getGenres())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);




//  function(dispatch){
//     return fetch('http://localhost:3001/videogames')
//     .then(resp => resp.json() )
//     .then(res => {
//         !res.length ? dispatch({type:'GET_VIDEOGAMES', payload: ['no hay juegos']}) : 
//         dispatch({
//         type: 'GET_VIDEOGAMES',
//         payload: res
//     })})
//     .catch(err => console.log(err))

// }


{/* {
                videogames.map(e =>{
                    return(
                    <div key={e.id}>
                        <div>{e.name}</div>
                        <div>{e.img}</div>

                    </div>
                    )
                    
                })

            } */}