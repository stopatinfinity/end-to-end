import { Box, Button, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'                    // so we can do client-side routing
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, Logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer()
    });
    let body = null;

    // data loading 
    if (fetching) {
        body = null;
    } else if (!data?.me) { // user not logged in
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        )
    } else { // user logged in
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={() => {
                        Logout();
                    }}
                    isLoading={logoutFetching}
                    variant="link">
                    logout
                </Button>
            </Flex>
        )
    }

    return (
        <Flex bg="tan" p={4} >
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
};