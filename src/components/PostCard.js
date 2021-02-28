import React, { useContext } from 'react'
import { Card, Icon, Label, Button } from "semantic-ui-react";
import moment from 'moment'
import { Link } from "react-router-dom";
import LikeButton from './LikeButton'
import MyPopup from '../util/MyPopup'

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function PostCard({
                      post: {body, createdAt, id, username, likeCount, commentCount, comments, likes}
}) {
    const { user } = useContext(AuthContext)

    return(
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content="comment on post">
                    <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                
                { user && user.username === username && (
                    <DeleteButton postId={ id } />
                ) }
            </Card.Content>
        </Card>
    )

}

export default PostCard;