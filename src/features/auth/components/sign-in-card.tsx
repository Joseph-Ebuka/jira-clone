import { DottedSeperator } from "@/components/dotted-seperator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[486px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeperator />
      </div>
    </Card>
  );
};
