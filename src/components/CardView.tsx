import { Card, CardContent, Typography } from "@mui/material";
import { BusinessObject } from "../interfaces/BusinessObject";

// ...
interface CardViewProps {
    data: BusinessObject[];
    schema: any;
  }
  
  const CardView: React.FC<CardViewProps> = ({ data, schema }) => {
    const settings = schema.attributes.filter((attr:any) => attr.cardView);
//     const attributes = getSchemaAttributes(schemaName);
//    // const settings = getBusinessObjectSettings(schemaName);
//     const schema = getSchema(schemaName); // Retrieve the correct schema object
//     const settings = schema.settings;
    return (

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map(item => (
          <Card key={item.id} style={{ width: 200, margin: 16 }}>
            <CardContent>
            {settings.map((attribute:any) => (
              <Typography key={attribute.key} variant="body2">
                {`${attribute.name}: ${item[attribute.key as keyof typeof item]}`}
              </Typography>
            ))}
            {/* {settings &&
                    attributes
                    .filter((attribute: any )=> settings.viewAttributes.includes(attribute))
                    .map((attribute: string) => (
                        <Typography key={attribute} variant="body2">
                        {`${attribute}: ${item[attribute as keyof typeof item]}`}
                        </Typography>
                    ))} */}
              {/* {attributes
                .filter(attribute => settings.viewAttributes.includes(attribute))
                .map(attribute => (
                  <Typography key={attribute} variant="body2">
                    {`${attribute}: ${item[attribute as keyof typeof item]}`}
                  </Typography>
                ))} */}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  export default CardView;