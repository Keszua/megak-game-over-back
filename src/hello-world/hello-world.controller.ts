import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('hello-world')
export class HelloWorldController {

    @Get()
    testAction() {
        return `Aplikacja działa :)`;
    }
}
