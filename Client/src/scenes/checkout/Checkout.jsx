import {
    Box,
    FormControl,
    FormLabel,
    InputLabel,
    Step,
    StepLabel,
    Stepper,
    MenuItem,
    Grid,
    Typography,
    Button,
    FormControlLabel,
    Radio
} from "@mui/material";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from "@mui/material/TextField";
import {setOrganisation, setDelive, setDeliveryAdress, setDeliveryComment, setOrderComment, setDeliveryDate, clearBag} from "state"
import { useUpdateOrderMutation } from "state/api";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useNavigate} from "react-router-dom";


const Step1 = ()=>{
    const cart = useSelector((state) => state.global.cart);
    const warehouses = useSelector((state) => state.global.warehouses);

    const columns = [
        {
            field: 'catalog',
            headerName: 'Номенклатура',
            flex: 0.8,
        },
        {
            field: 'warehouse',
            headerName: 'Склад',
            flex: 0.3,
        },
        {
            field: 'toOrder',
            headerName: 'Заказ',
            flex: 0.2,
        },
        {
            field: 'price',
            headerName: 'Цена',
            flex: 0.2,
        },
        {
            field: 'amount',
            headerName: 'Сумма',
            flex: 0.2,
        },
    ];

    const cartPresenter = cart.map(item => ({
        id: `${item.wh}${item.catalog.id}`,
        catalog: item.catalog.name,
        warehouse: warehouses.find(w => w.id === item.wh)?.name,
        toOrder: `${item.order} ${item.catalog.storeUnit.name}`,
        price: `₽ ${new Intl.NumberFormat('ru-RU', ).format(item.price.value)}`,
        amount: `₽ ${new Intl.NumberFormat('ru-RU', ).format(item.order * item.price.value)}`
    }));

    const totalPrice = cart.reduce((total, item) => {
        return total + item.order * item.price.value;
    }, 0);

    return (
        <Box>
            <DataGrid columns={columns}
                      rows={cartPresenter}
                      hideFooterRowCount
                      hideFooterSelectedRowCount>

            </DataGrid>
            <Typography variant="h3">ИТОГО ₽ {new Intl.NumberFormat('ru-RU', ).format(totalPrice)}</Typography>
        </Box>
    );
}

const Step2 =()=>{

    const dispatch = useDispatch();

    const partner = useSelector((state) => state.global.partner);
    const orderDetail = useSelector((state) => state.global.orderDetail);

    const [company, setCompany] = useState(orderDetail.organisation? (partner?.companies.length? partner?.companies[0]: null): orderDetail.organisation);
    const [delivery, setDelivery] = useState(orderDetail.delive);
    const [adress, setAdress] = useState(orderDetail.deliveryAdress? orderDetail.deliveryAdress: partner?.deliveryAddress.length? partner?.deliveryAddress[0]: "");
    const [comment, setComment] = useState(orderDetail.deliverComment);
    const [date, setDate] = useState(dayjs(new Date())) //orderDetail.deliveryDate? orderDetail.deliveryDate: dayjs(new Date())

    //TODO: Разобраться с датой и форматом

    return(
      <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="label-organisation">Организация</InputLabel>
              <Select labelId="label-organisation"
                      value={company}
                      onChange={(event)=>{
                          setCompany(event.target.value);
                          dispatch(setOrganisation(event.target.value))
                      }}
                      autoWidth
                      >
                  {
                      partner?.companies.map(company=> {
                          return <MenuItem value={company}>{company.name}</MenuItem>
                          }
                      )
                  }
              </Select>
              <Typography sx={{ mt:"20px"}} hidden={delivery}>Нужна доставка?</Typography>
              <Switch checked={delivery}
                      labe
                      onChange={event => {
                          setDelivery(event.target.checked)
                          dispatch(setDelive(event.target.checked))
              }}/>

              {
                  delivery &&
                  (
                      <Box>
                          <Box sx={{ mt:"20px" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                      label="Дата доставки"
                                      value={date}
                                      onChange={(newValue) =>{
                                          setDate(newValue);
                                          dispatch(setDeliveryDate(newValue));
                                      }}
                                  />
                              </LocalizationProvider>
                          </Box>

                          <Box sx={{mt:"20px"}}>
                              <FormLabel id="id-radio-group">Выберите адрес</FormLabel>
                              <RadioGroup aria-labelledby="id-radio-group"
                                          row
                                          onChange={(event)=>{
                                              setAdress(event.target.value)
                                              dispatch(setDeliveryAdress(event.target.value))
                                          }}>
                                  {
                                      partner?.deliveryAddress.map(adr => {
                                          return (
                                              <FormControlLabel value={adr} control={<Radio />} label={adr} />
                                          )
                                      })
                                  }
                                  <FormControlLabel value="" control={<Radio />} label="Указать в ручную" />
                              </RadioGroup>
                              <Box component="form"
                                   sx={{
                                       '& .MuiTextField-root': { m: 1, width: '25ch', minWidth: 500}, maxWidth: '100%',
                                   }}
                                   noValidate
                                   autoComplete="off">
                                  <TextField
                                      variant="outlined"
                                      label="Адрес доставки"
                                      multiline
                                      rows={4}
                                      value={adress}
                                      onChange={(event) => {
                                          setAdress(event.target.value)
                                          dispatch(setDeliveryAdress(event.target.value))
                                      }}
                                      contentEditable
                                  />
                              </Box>
                              <Box
                                  sx={{
                                      '& .MuiTextField-root': { m: 1, width: '25ch', minWidth: 500}, maxWidth: '100%',
                                  }}>
                                  <TextField
                                      variant="outlined"
                                      label="Комментарий к доставке"
                                      multiline
                                      rows={4}
                                      value={comment}
                                      onChange={(event) => {
                                          setComment(event.target.value)
                                          dispatch(setDeliveryComment(event.target.value))
                                      }}
                                      contentEditable
                                  />
                              </Box>

                          </Box>

                      </Box>
                  )
              }
          </FormControl>
      </Box>
    );
}

const Step3 =()=>{

    const orderDetail = useSelector((state) => state.global.orderDetail);

    const dispatch = useDispatch();

    const [comment, setComment] = useState(orderDetail.comment);

    return(
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', minWidth: 800}, maxWidth: '100%',
            }}>
            <TextField
                variant="outlined"
                label="Комментарий к заказу"
                multiline
                rows={8}
                value={comment}
                onChange={(event) => {
                    setComment(event.target.value)
                    dispatch(setOrderComment(event.target.value))
                }}
                contentEditable
            />
        </Box>
    );
}

const Step4 =()=>{

    const orderDetail = useSelector((state) => state.global.orderDetail);
    const cart = useSelector((state) => state.global.cart);
    const warehouses = useSelector((state) => state.global.warehouses);

    const cartPresenter = cart.map(item => ({
        id: `${item.wh}${item.catalog.id}`,
        catalog: item.catalog.name,
        warehouse: warehouses.find(w => w.id === item.wh)?.name,
        toOrder: `${item.order} ${item.catalog.storeUnit.name}`,
        price: `₽ ${new Intl.NumberFormat('ru-RU', ).format(item.price.value)}`,
        amount: `₽ ${new Intl.NumberFormat('ru-RU', ).format(item.order * item.price.value)}`
    }));

    const totalPrice = cart.reduce((total, item) => {
        return total + item.order * item.price.value;
    }, 0);

    return(
        <Box>
            <Typography variant="h4">Общая сумма заказа ₽ {new Intl.NumberFormat('ru-RU', ).format(totalPrice)}</Typography>
            <Typography variant="h6">Тоная сумма заказа с учетом скидок и текущих акций будет указано после обработки заказа сотрудником</Typography>
            <Typography sx={{ mt: "10px" }}>Документы оформляем на: {orderDetail?.organisation.name}</Typography>
            {
                orderDetail?.delive &&
                <Typography sx={{ mt: "20px" }}>Доставка по адресу: {orderDetail?.deliveryAdress}</Typography>
            }
            {
                orderDetail?.delive && orderDetail?.deliverComment &&
                <Typography sx={{ mt: "20px" }}>Комментарий к доставке: {orderDetail?.deliverComment}</Typography>
            }
            {
                orderDetail?.comment &&
                <Typography sx={{ mt: "20px" }}>Комментарий к заказу: {orderDetail?.comment}</Typography>
            }
        </Box>
    );
}

export const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const cart = useSelector((state) => state.global.cart);
    const warehouses = useSelector((state) => state.global.warehouses);

    const partner = useSelector((state) => state.global.partner);
    const orderDetail = useSelector((state) => state.global.orderDetail);

    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation()

    const isStepOptional = (step) => {
        return step === 2;
    };
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = (props) => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        }

        if (activeStep === steps.length - 1)
        {
            const warehouses = cart.map(item=>{
                return item.wh
            })
            const wh = warehouses.filter((value, index, array)=> {
                return array.indexOf(value) === index
            })

            wh.map(warehouseId=>{
                const  order = {
                    id: uuidv4(),
                    number: "",
                    data: new Date(),
                    deliveryType: orderDetail.delive? "delivery": "pickup",
                    deliveryAddress: orderDetail.deliveryAdress,
                    deliveryDate: orderDetail.deliveryDate,
                    wholeShip: true,
                    currencyId: "",
                    partnerId: partner.id,
                    companyId: orderDetail.organisation.id,
                    contractId: orderDetail.organisation.contractId,
                    agreementId: partner.agreementId,
                    warehouseId,
                    amount: cart.filter(p=>p.wh===warehouseId)
                        .reduce((acc, curr)=> {
                        return acc + curr.wh === warehouseId ? 0: curr.order * curr.price.value
                    }, 0),
                    goods: cart.filter(p=>p.wh === warehouseId)
                        .map(item=>{

                        return {
                            productId: item.catalog.id,
                            unitRef: item.catalog.storeUnit.id,
                            quantity: item.order,
                            amount: item.order * item.price.value,
                            price: item.price.value,
                            priceTypeId: item.price.priceTypeId,
                            priceByUnit: item.price.value,
                            unitQuantity: item.order,
                            TAXRate: item.catalog.tax.id,
                            amountTaxes: item.catalog.tax.value,
                            warehouseId: item.wh,
                        }
                    })
                }

                updateOrder({ order});
            })

            dispatch(clearBag());
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        "О товаре",
        "О заказе",
        "Комментарий",
        "Подтверждение",
    ];

    return (
        <Box width="80%" m="100px auto">
            <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
                {
                    steps.map((label, index) => {

                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })
                }
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h3">
                        Ваш заказ отправлен на обработку.
                    </Typography>
                    <Typography sx={{ mt: "10px", mb: 1 }}>
                        Вы можете просматривать статусы заказов в общем журнале.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={() =>{
                            handleReset()
                            navigate("/orders")
                        }}>Перейти в заказы</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 && <Step1/>}
                    {activeStep === 1 && <Step2/>}
                    {activeStep === 2 && <Step3/>}
                    {activeStep === 3 && <Step4/>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Назад
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Пропустить
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Отправить' : 'Следующий'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default Checkout;