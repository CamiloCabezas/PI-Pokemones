import SearchBar from "../SearchBar/searchBar";


const Nav = ({onSearch, tohome}) => {
    return(
        <nav>
            <SearchBar onSearch={onSearch} tohome={tohome}/>
        </nav>
    )
};

export default Nav;