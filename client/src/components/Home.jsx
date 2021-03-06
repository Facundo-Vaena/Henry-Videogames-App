import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getVideogames } from '../actions/index';
import { getGenres } from '../actions/index'
import { Link } from 'react-router-dom';
import Videogame from './Videogame';
import './Home.css';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';



export function Home({ videogames, genres, getVideogames, getGenres, results }) {
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
 // eslint-disable-next-line
    }, [])

    function preGetVideogames() {
        if (orderFilter.order === 'default') {
            getVideogames()
            return setOrderFilter({ order: null, filter: null })
        }
        getVideogames(orderFilter.order, orderFilter.filter);
        setOrderFilter({ order: null, filter: null })
    }




    return (<div className='homeContainer'>

        <div className='homeSubcontainer'>
            {results > 15 || results === undefined || videogames.length > 15 ? <div>
                <button className='homePageBtn' onClick={() => setPage(0)}>1</button>
                <button className='homePageBtn' onClick={() => setPage(16)}>2</button>
                <button className='homePageBtn' onClick={() => setPage(31)}>3</button>
                <button className='homePageBtn' onClick={() => setPage(47)}>4</button>
                <button className='homePageBtn' onClick={() => setPage(63)}>5</button>
                <button className='homePageBtn' onClick={() => setPage(79)}>6</button>
                <button className='homePageBtn' onClick={() => setPage(95)}>7</button>


            </div> : null}
            <NavLink to='/' className='navLink'>
                <h1 className='homeTitle'>Henry Videogames</h1>
            </NavLink>
            <div className='homeSearchBar'>
                <SearchBar />
            </div>
            {!videogames.length ? <div className='homeLoadingContainer'><CircularProgress /></div> : null}
            <div className='searchCreationOrder'>


                <div className='btnHomeContainer'>
                    <Link to={'/createvideogame'}>
                        <button className='btnHomeCreation'>Videogames Creation</button>
                    </Link>
                </div>




                <span className={open ? 'orderFilterContainerClicked' : 'orderFilterContainer'}>
                    <div><button type="button" class="btn " onClick={() => setOpen(!open)}>Order & Filter</button></div>
                    {orderFilter.order !== null || orderFilter.filter !== null ? <button className='filterOrderEnter' onClick={() => preGetVideogames()}>Reorganize Videogames</button> : null}

                    <div className='orderContainer'>
                        {open ? <span><button className='filterOrderStart' onClick={() => setOpenOrder(!openOrder)}>Order</button></span> : null}
                        <div className='ordersContainer'>
                            {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'default' })}>Default</button></span> : null}
                            {openOrder && open ? <span><button className='filterOrderEnd' onClick={() => setOrderFilter({ ...orderFilter, order: 'aAsc' })}>Ascending Alphabetical Order</button> </span> : null}
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

                </span>
            </div>

            <div className='videogames'>
                {videogames.length &&
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
                    ) 
                }

            </div>



        </div>










    </div>)
}

function mapStateToProps(state) {
    return {
        videogames: state.videogames,
        genres: state.genres,
        results: state.results
    }
}




function mapDispatchToProps(dispatch) {
    return {
        getVideogames: (order, filter) => dispatch(getVideogames(order, filter)),
        getGenres: () => dispatch(getGenres())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


