import {combineReducers} from 'redux'
import {users} from "./users";
import {topics} from "./topics";
import {article} from "./article";
import {publicArticle} from "./publicArticle";
import {updateArticle} from "./updateArticle";
import {authorInfo} from "./authorInfo";
import {message} from "./message";

const reducer = combineReducers({
    users,
    topics,
    article,
    publicArticle,
    updateArticle,
    authorInfo,
    message,


});

export default reducer;