$(document).ready(function () {
	// form multiple handle
	let ref = "";
	$(".kode_akun").each(function () {
		ref += `<option value="${$(this).val()}">${$(this).val()}</option>`;
	});
	const writeForm = () => {
		let form = `
		<tr class="formel">
			<div class="row">
				<td>
					<input type="date" class="form-control tanggal" name="tanggal" style="width: 170px;">
				</td>
				<td>
					<input type="text" class="form-control bukti" name="bukti">
				</td>
				<td>
					<select class="custom-select jurnal" name="jurnal" style="width: 132px;">
						<option value="Umum" selected>Umum</option>
						<option value="Penyesuaian">Penyesuaian</option>
						<option value="Penutup">Penutup</option>
					</select>

				</td>
				<td>
					<input type="text" class="form-control keterangan" name="keterangan">
				</td>
				<td>
					<select class="custom-select ref" name="ref">
						${ref}
					</select>
						</td>
						<td>
							<select class="custom-select tambah_kurang" name="tambah_kurang">
								<option value="Tambah" selected>Tambah</option>
								<option value="Kurang">Kurang</option>
							</select>
						</td>
						<td>
							<input type="number" class="form-control nominal" name="nominal">
						</td>
					</div>
				</tr>
			`;

		$("#form-row").append(form);
	};

	console.log("ok");
	let counter = 1;
	$("#jumlah_baris").val(counter);
	// writeForm();
	$("#kurang").on("click", function () {
		if (counter > 1) {
			counter -= 1;
			$(".formel").last().remove();
			$("#jumlah_baris").val(counter);
		}
	});
	$("#tambah").on("click", function () {
		counter += 1;
		writeForm();
		$("#jumlah_baris").val(counter);
	});
	// endform multiple handle

	// form inputan handle
	$("#tambahkan").on("click", function () {
		const tanggal = [];
		$(".tanggal").each(function () {
			tanggal.push($(this).val());
		});
		const bukti = [];
		$(".bukti").each(function () {
			bukti.push($(this).val());
		});
		const jurnal = [];
		$(".jurnal").each(function () {
			jurnal.push($(this).find(":selected").val());
		});
		const keterangan = [];
		$(".keterangan").each(function () {
			keterangan.push($(this).val());
		});
		const ref = [];
		$(".ref").each(function () {
			ref.push($(this).find(":selected").val());
		});
		const tambah_kurang = [];
		$(".tambah_kurang").each(function () {
			tambah_kurang.push($(this).find(":selected").val());
		});
		const nominal = [];
		$(".nominal").each(function () {
			nominal.push($(this).val());
		});
		const data_akun = [
			tanggal,
			bukti,
			jurnal,
			keterangan,
			ref,
			tambah_kurang,
			nominal,
		];
		const baseurl = $(".tambah").data("baseurl");
		console.log(baseurl);
		$.ajax({
			url: baseurl + "jurnal/insert_data",
			type: "POST",
			data: { jurnal: JSON.stringify(data_akun) },
			success: (res) => {
				document.location.href = baseurl + "jurnal/index";
			},
		});
	});
	// end form inputan handle

	// excel input handle
	let selectedFile;
	const baseurl = $("#fileUpload").data("url");
	$("#fileUpload").on("change", function (event) {
		selectedFile = event.target.files[0];
		$("#fileUpLabel").html(selectedFile.name);
	});

	$("#upload").on("click", function () {
		if (selectedFile) {
			const fileReader = new FileReader();
			fileReader.readAsBinaryString(selectedFile);
			fileReader.onload = function (event) {
				let data = event.target.result;

				let wb = XLSX.read(data, { type: "binary" });

				wb.SheetNames.forEach((sheet) => {
					let rowObject = XLSX.utils.sheet_to_row_object_array(
						wb.Sheets[sheet]
					);
					$.ajax({
						url: baseurl + "jurnal/uploadKode",
						type: "POST",
						data: {
							kode: JSON.stringify(rowObject),
						},
						success: function (result) {
							document.location.href = baseurl + "jurnal/Kode_akun";
						},
					});
				});
			};
		}
	});
	// end excel input handle
});
