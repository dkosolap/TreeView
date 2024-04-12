import { Search as SearchIcon } from "@mui/icons-material";
import { FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useTreeViewStore } from "src/stores/TreeViewStore";
import { useDebounce } from "src/utils/useDebounce";

const Search: React.FC = () => {
  const store = useTreeViewStore();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 150);

  const onChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  useEffect(() => {
    store.onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <FormControl variant="standard" sx={{ width: '100%' }}>
      <InputLabel htmlFor="input-with-icon-adornment">
        Search
      </InputLabel>
      <Input
        value={value}
        onChange={onChange}
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Search;
