import React, { ChangeEvent, useState, useContext } from 'react';
import { Dropdown } from 'reactstrap';
import { AllPostsContext } from '../../context/AllPostsContext';

function DropdownPostOptions({ post }: any) {
    const [dropdownValue, setdropdownValue] = useState(post.isPublic);
    const { togglePostVisibility } = useContext(AllPostsContext);

    const setPublic = () => {
        togglePostVisibility(post._id, true);
        setdropdownValue(true);
    };

    const setPrivate = () => {
        togglePostVisibility(post._id, false);
        setdropdownValue(false);
    };

    return (
        <div className="dropdown">
            <Dropdown>
                {post.isPublic ? (
                    <select
                        value={dropdownValue}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            e.target.value === 'true' ? setPublic() : setPrivate();
                        }}
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                ) : (
                    <select
                        value={dropdownValue}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            e.target.value === 'false' ? setPrivate() : setPublic();
                        }}
                    >
                        <option value="false">Private</option>
                        <option value="true">Public</option>
                    </select>
                )}
            </Dropdown>
        </div>
    );
}

// function DropdownPostOptions({ post }: any) {
//     const [dropdownValue, setdropdownValue] = useState(post.isPublic);
//     const {togglePostVisibility} = useContext(AllPostsContext)

//     const setVisible = (id: string) => {
//         const body = {
//             postID: id,
//             isPublic: dropdownValue === 'Public' ? true : false
//         }
//         Axios.put(`/api/posts/createPost/${id}`, body, config)
//             .catch(err => console.log(err))
//     }

//     return (
//         <div className="dropdown">
//             {console.log(post)}
//             <Dropdown onClick={() => setVisible(post._id)}>
//                 {post.isPublic ?
//                     <select
//                         value={dropdownValue}
//                         onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                     :
//                     <select
//                         value={dropdownValue}
//                         onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
//                         <option value="Private">Private</option>
//                         <option value="Public">Public</option>
//                     </select>}
//             </Dropdown>
//         </div>
//     )
// }

export default DropdownPostOptions;
