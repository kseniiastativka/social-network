import { addPostActionCreator, profileReducer } from "./profile-reducer";
let initialState = {
  posts: [
    { id: 1, message: "Miss me?", likesCount: 12 },
    { id: 2, message: "I have a vacation soon!", likesCount: 34 },
    { id: 3, message: "I want banana bread", likesCount: 7 },
  ],
  profile: undefined,
  status: "",
  profileEditError: "",
};

it("new post should be added ", () => {
  let action = addPostActionCreator("it-kamasutra.com");
  let newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(4);
  expect(newState.posts[3].message).toBe("it-kamasutra.com");
});
