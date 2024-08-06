

/* eslint-disable react/prop-types */
const SearchInput = ({ searchTerm, handleSearch, isSearchFocused, setIsSearchFocused }) => {
    return (
        <div className="text-center mb-6">
            <input
                type="text"
                placeholder={isSearchFocused ? '' : 'Search products...'}
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="home-search"
            />
        </div>
    );
};

export default SearchInput;
