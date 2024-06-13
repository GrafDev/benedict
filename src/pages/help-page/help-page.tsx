import {Card, Text} from "@chakra-ui/react";

const HelpPage = () => {

    return (
        <Card >
            <Text>
                N-back game: You will be presented with words on the screen.
                You need to remember the translation of the word,
                which was shown N moves ago,
                and the word that is shown now.
            </Text>
            <Text>
                Active brain function:
                Playing N-back engages different areas of the brain,
                strengthening neural connections and increasing your ability to remember.
            </Text>
            <Text>
                Much more effective than cards:
                Studies have shown that the N-back method is several times more effective
                traditional word learning methods such as flashcards.
            </Text>
        </Card>
    )
}

export default HelpPage