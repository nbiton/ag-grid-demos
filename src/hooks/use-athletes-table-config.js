import {useMemo} from "react";

export const useAthletesTableConfig = (modifier = x => x) => {
    return useMemo(() => {
        return modifier({
            columnDefs: [
                {
                    field: 'athlete',
                    minWidth: 150,
                    filter: null
                },
                {
                    field: 'age',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'country',
                    minWidth: 150,
                },
                {
                    field: 'year',
                    filter: 'agNumberColumnFilter'
                    // filter: 'customFilter',
                },
                {
                    field: 'date',
                    minWidth: 130,
                    filter: 'agDateColumnFilter',
                    filterParams: {
                        comparator: function (filterLocalDateAtMidnight, cellValue) {
                            const dateAsString = cellValue;
                            const dateParts = dateAsString.split('/');
                            const cellDate = new Date(
                                Number(dateParts[2]),
                                Number(dateParts[1]) - 1,
                                Number(dateParts[0])
                            );
                            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                                return 0;
                            }
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            }
                            if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            }
                        },
                    },
                },
                { field: 'sport' },
                {
                    field: 'gold',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'silver',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'bronze',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'total',
                    filter: 'agNumberColumnFilter',
                },
            ],
            defaultColDef: {
                editable: true,
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true,
            },
            frameworkComponents: {
                // customFilter: CustomFilter,
            }
        });
    }, [])
}