import { FC, ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

type props = {
    cardData?: any;
    schemaData?: any;
};

const CSCard: FC<props> = ({ schemaData, cardData }): ReactElement => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            {cardData?.map((card: any, index: number) => (
                <Card
                    key={index}
                    style={{
                        minWidth: '200px',
                        maxWidth: '300px',
                        margin: '10px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                    elevation={3}
                >
                    <Grid xs={6} md={4} >
                        <Card>
                            {schemaData?.map(
                                (schema: any, i: Number) =>
                                    schema?.cardView && (
                                        <CardContent key={`${index}-${i}`} >
                                            <Typography sx={{ fontSize: 13 }} variant="body2">
                                                <b>{schema?.name} :</b> {card[schema?.key]}
                                            </Typography>
                                        </CardContent>
                                    )
                            )}
                        </Card>
                    </Grid>
                </Card>
            ))}
        </div>
     
    );
};

export default CSCard;
