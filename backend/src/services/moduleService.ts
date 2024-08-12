import Module, { IModule } from "../models/module";
import Course from "../models/course";
import { ErrorHandler } from "../utils/errorHandler";
import HTTP_STATUS from "../constants/statusCodes";

class ModuleService {
  public async createModule(
    courseRef: string,
    title: string,
    lockUntil: Date
  ): Promise<IModule> {
    const course = await Course.findById(courseRef);
    if (!course) {
      throw new ErrorHandler(HTTP_STATUS.NOT_FOUND, "Course not found");
    }

    const lastModule = await Module.findOne({ courseRef: courseRef }).sort({
      order: -1,
    });
    const order = !lastModule ? 0 : lastModule.order + 1;

    const module = await Module.create({
      courseRef: courseRef,
      title: title,
      order: order,
      lockUntil: lockUntil,
    });
    delete module.createdAt, module.updatedAt, module.__v;

    return module;
  }
}

export default ModuleService;