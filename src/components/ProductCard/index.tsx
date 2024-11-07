import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { StarPuntuacion } from "../StarPuntation";

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="p-4">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => e.currentTarget.src = "/logo.jpg"}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
        <p className="text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <StarPuntuacion rating={product.rating} />
        <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
        <span className="text-sm text-gray-500">{product.stock} disponibles</span>
        <Button variant="default" size="sm"
          onClick={() => navigate(`/producto/${product.id}`)}
        >Ver</Button>
      </CardFooter>
    </Card>
  );
}

