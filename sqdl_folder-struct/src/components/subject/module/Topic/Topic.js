import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";

const Topic = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div>
      <h3 className="text-5xl ml-5 mt-5 text-dark-gray font-montserrat font-extrabold">
        Topics
      </h3>
      <Accordion className="p-8 mb-2" open={open === 1}>
        <AccordionHeader className="mb-4" onClick={() => handleOpen(1)}>
          Topic Name 1
        </AccordionHeader>
        <AccordionBody>
          <div class="mb-4 flex flex-col overflow-x-auto">
            <div class="sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-x-auto">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" class="px-6 py-4">
                          Session
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Description
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Students
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Start Time
                        </th>
                        <th scope="col" class="px-6 py-4">
                          End Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          1
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                      </tr>
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap px-6 py-4 font-medium ">
                          2
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                      </tr>
                      <tr class="border-b ">
                        <td class="whitespace-nowrap px-6 py-4 font-medium ">
                          3
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                        <td class="whitespace-nowrap px-6 py-4">Cell</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AccordionBody>
        <Button>Add session</Button>
      </Accordion>
    </div>
  );
};

export default Topic;
