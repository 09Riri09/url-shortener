import aws_cdk as cdk
from constructs import Construct
from aws_cdk import (aws_apigateway as apigateway,
                     aws_s3 as s3,
                     aws_dynamodb as dynamo_db,
                     aws_lambda as lambda_)
from aws_cdk import Stack
class BackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        handler = lambda_.Function(self, "UrlFunction",
                                   runtime=lambda_.Runtime.NODEJS_18_X,
                                   code=lambda_.Code.from_asset("resources"),
                                   handler="server.main")

        table = dynamo_db.Table(self, "UrlMappingTable",
                                table_name="UrlMapping",
                                partition_key=dynamo_db.Attribute(
                                    name="short_form",
                                    type=dynamo_db.AttributeType.STRING)
                                )

        table.grant_read_write_data(handler)


        api = apigateway.RestApi(self, "url-shortner-api",
                                 rest_api_name="url-shortner",
                                 description="This service is used for shorting urls")

        url = api.root.add_resource("short")
        put_url = api.root.add_resource("add-url")
        
        url = url.add_resource("{url}")

        get_url_integration = apigateway.LambdaIntegration(
            handler, request_templates={"application/json": '{ "statusCode": "200" }'})

        url.add_method("GET", get_url_integration)  # GET /
        put_url.add_method("POST", get_url_integration)
