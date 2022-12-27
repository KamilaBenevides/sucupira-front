<template>
    <div>
        asasd
        <!-- {{ data.elements[0] }} -->
    </div>
</template>
<script>
export default {
    data: () => ({
        data: {
            "elements": [
                {
                    "type": "element",
                    "name": "employee",
                    "attributes": {
                        "id": "be129"
                    },
                    "elements": [
                        {
                            "type": "element",
                            "name": "firstname",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Jitendra"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "lastname",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Kumar"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "title",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Engineer"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "division",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "Materials"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "building",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "327"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": "room",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "19"
                                }
                            ]
                        }
                    ]
                },
            ]
        }   
    })
}
</script>